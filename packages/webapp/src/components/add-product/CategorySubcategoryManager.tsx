import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { CategoryResponse } from "@/lib/schemas/category";
import { useEffect, useState } from "react";
import { LoadingButton } from "../ui/loading-button";
import { CheckCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { SubcategoryResponse } from "@/lib/schemas/subcategory";
import { toast } from "sonner";
import { capitalizeFirstLetter } from "@/lib/utils";
import {
  createSubcategory,
  deleteSubategory,
  getAllSubcategories,
  updateSubcategory,
} from "@/api/subcategory";
import { Ban } from "lucide-react";
import {
  createCategory,
  getAllCategories,
  updateCategory,
} from "@/api/category";

type Option = "category" | "subcategory";

function Sidebar({
  selected,
  setSelected,
}: {
  selected: Option;
  setSelected: (option: Option) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p
        className={`text-left cursor-pointer ${selected == "category" ? "font-medium" : "text-muted-foreground"}`}
        onClick={() => setSelected("category")}
      >
        Categories
      </p>
      <p
        className={`text-left cursor-pointer ${selected == "subcategory" ? "font-medium" : "text-muted-foreground"}`}
        onClick={() => setSelected("subcategory")}
      >
        Subategories
      </p>
    </div>
  );
}

function CategoryManager() {
  const queryClient = useQueryClient();

  //   const categoriesData = queryClient.getQueryData<CategoryResponse[]>([
  //     "categories",
  //   ]);
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const [name, setName] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryIdToRename, setCategoryIdToRename] = useState<string | null>(
    null
  );
  const [updatedName, setUpdatedName] = useState<string | null>(null);

  const categories =
    categoriesData?.map((category: any) => ({
      name: category.categoryName,
      id: category.id,
    })) || [];

  useEffect(() => {
    const idToUse = categoryId || categoryIdToRename;

    const name = categories.find(({ id }) => id == idToUse)?.name;

    if (name) setSelectedCategory(name);
  }, [categoryId, categoryIdToRename]);

  const save = async () => {
    if (!name) return;

    await createCategory({
      categoryName: name,
      storeId: "1",
    });
  };

  const update = async () => {
    if (!categoryIdToRename || !updatedName) return;

    await updateCategory(categoryIdToRename, {
      categoryName: updatedName,
      storeId: "1",
    });
  };

  const deleteCategory = async () => {
    if (!categoryId) return;

    await deleteSubategory(categoryId);
  };

  const createMutation = useMutation({
    mutationFn: save,
    onSuccess: () => {
      toast(`Category '${name}' created`, {
        icon: <CheckCircledIcon className="w-4 h-4" />,
      });

      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast("Something went wrong", { icon: <Ban className="w-4 h-4" /> });
    },
  });

  const updateMutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      toast(`Category '${selectedCategory}' updated`, {
        icon: <CheckCircledIcon className="w-4 h-4" />,
      });

      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
    },
    onError: () => {
      toast("Something went wrong", { icon: <Ban className="w-4 h-4" /> });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast(`Category '${selectedCategory}' deleted`, {
        icon: <CheckCircledIcon className="w-4 h-4" />,
      });

      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast("Something went wrong", { icon: <Ban className="w-4 h-4" /> });
    },
  });

  return (
    <div className="space-y-4">
      <div>
        <p className="font-medium">Add category</p>
        <Separator className="mt-2" />
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <LoadingButton
            className="ml-auto"
            variant={"outline"}
            disabled={!name}
            isLoading={createMutation.isPending}
            onClick={() => createMutation.mutate()}
          >
            Save
          </LoadingButton>
        </div>
      </div>

      <div>
        <p className="font-medium">Update category</p>
        <Separator className="mt-2" />

        <div className="grid gap-4 py-4">
          <div className="flex gap-4 items-center">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setCategoryIdToRename(value)}>
              <SelectTrigger id="category" aria-label="Select category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => {
                  return (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(e) => setUpdatedName(e.target.value)}
            />
          </div>

          <LoadingButton
            className="ml-auto"
            disabled={!categoryIdToRename || !updatedName}
            isLoading={updateMutation.isPending}
            onClick={() => updateMutation.mutate()}
            variant={"outline"}
          >
            Update
          </LoadingButton>
        </div>
      </div>

      <div>
        <p className="font-medium">Delete category</p>
        <Separator className="mt-2" />
        <div className="grid gap-4 py-4">
          <div className="flex gap-4 items-center">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setCategoryId(value)}>
              <SelectTrigger id="category" aria-label="Select category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => {
                  return (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <LoadingButton
            variant={"outline"}
            className="ml-auto text-destructive"
            disabled={!categoryId}
            isLoading={deleteMutation.isPending}
            onClick={() => deleteMutation.mutate()}
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            Delete
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}

function SubcategoryManager() {
  const queryClient = useQueryClient();

  //   const subcategoriesData = queryClient.getQueryData<SubcategoryResponse[]>([
  //     "subcategories",
  //   ]);

  const { data: subcategoriesData } = useQuery({
    queryKey: ["subcategories"],
    queryFn: getAllSubcategories,
  });

  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [name, setName] = useState<string | null>(null);

  const [subcategoryIdToRename, setSubcategoryIdToRename] = useState<
    string | null
  >(null);
  const [newCategoryId, setNewCategoryId] = useState<string | null>(null);
  const [updatedName, setUpdatedName] = useState<string | null>(null);

  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [subcategoryId, setSubcategoryId] = useState<string | null>(null);

  const subcategories =
    subcategoriesData?.map((subcategory) => ({
      name: subcategory.subcategoryName,
      id: subcategory.id,
    })) || [];

  useEffect(() => {
    const idToUse = subcategoryId || subcategoryIdToRename;

    const name = subcategories.find(({ id }) => id == idToUse)?.name;

    if (name) setSelectedSubcategory(name);
  }, [subcategoryId, subcategoryIdToRename]);

  const categoriesData = queryClient.getQueryData<CategoryResponse[]>([
    "categories",
  ]);

  const categories =
    categoriesData?.map((category: any) => ({
      name: category.categoryName,
      id: category.id,
    })) || [];

  const save = async () => {
    if (!name || !categoryId) return;

    await createSubcategory({
      subcategoryName: name,
      storeId: "1",
      categoryId,
    });
  };

  const update = async () => {
    if (!subcategoryIdToRename) return;

    await updateSubcategory(subcategoryIdToRename, {
      subcategoryName: updatedName ?? undefined,
      storeId: "1",
      categoryId: newCategoryId ?? undefined,
    });
  };

  const deleteSubcategory = async () => {
    if (!subcategoryId) return;

    await deleteSubategory(subcategoryId);
  };

  const createMutation = useMutation({
    mutationFn: save,
    onSuccess: () => {
      toast(`Subcategory '${name}' created`, {
        icon: <CheckCircledIcon className="w-4 h-4" />,
      });

      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
    },
    onError: () => {
      toast("Something went wrong", { icon: <Ban className="w-4 h-4" /> });
    },
  });

  const updateMutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      toast(`Subcategory '${selectedSubcategory}' updated`, {
        icon: <CheckCircledIcon className="w-4 h-4" />,
      });

      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
    },
    onError: () => {
      toast("Something went wrong", { icon: <Ban className="w-4 h-4" /> });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSubcategory,
    onSuccess: () => {
      toast(`Subcategory '${selectedSubcategory}' deleted`, {
        icon: <CheckCircledIcon className="w-4 h-4" />,
      });

      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
    },
    onError: () => {
      toast("Something went wrong", { icon: <Ban className="w-4 h-4" /> });
    },
  });

  return (
    <div className="space-y-4">
      <div>
        <p className="font-medium">Add subcategory</p>
        <Separator className="mt-2" />
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setCategoryId(value)}>
              <SelectTrigger id="category" aria-label="Select category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => {
                  return (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <LoadingButton
            className="ml-auto"
            variant={"outline"}
            disabled={!name || !categoryId}
            isLoading={createMutation.isPending}
            onClick={() => createMutation.mutate()}
          >
            Save
          </LoadingButton>
        </div>
      </div>

      <div>
        <p className="font-medium">Update subcategory</p>
        <Separator className="mt-2" />

        <div className="grid gap-4 py-4">
          <div className="flex gap-4 items-center">
            <Label htmlFor="category">Subcategory</Label>
            <Select onValueChange={(value) => setSubcategoryIdToRename(value)}>
              <SelectTrigger id="subcategory" aria-label="Select subcategory">
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                {subcategories.map((subcategory) => {
                  return (
                    <SelectItem key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(e) => setUpdatedName(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setNewCategoryId(value)}>
              <SelectTrigger id="subcategory" aria-label="Select subcategory">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => {
                  return (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <LoadingButton
            className="ml-auto"
            disabled={!subcategoryIdToRename || !newCategoryId}
            isLoading={updateMutation.isPending}
            onClick={() => updateMutation.mutate()}
            variant={"outline"}
          >
            Update
          </LoadingButton>
        </div>
      </div>

      <div>
        <p className="font-medium">Delete subcategory</p>
        <Separator className="mt-2" />
        <div className="grid gap-4 py-4">
          <div className="flex gap-4 items-center">
            <Label htmlFor="category">Subcategory</Label>
            <Select onValueChange={(value) => setSubcategoryId(value)}>
              <SelectTrigger id="subcategory" aria-label="Select subcategory">
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                {subcategories.map((subcategory) => {
                  return (
                    <SelectItem key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <LoadingButton
            variant={"outline"}
            className="ml-auto text-destructive"
            disabled={!subcategoryId}
            isLoading={deleteMutation.isPending}
            onClick={() => deleteMutation.mutate()}
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            Delete
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}

export default function CategorySubcategoryManager() {
  const [selected, setSelected] = useState<Option>("category");
  return (
    <div className="flex pt-4">
      <div className="w-[30%]">
        <Sidebar selected={selected} setSelected={setSelected} />
      </div>

      {selected == "category" && <CategoryManager />}
      {selected == "subcategory" && <SubcategoryManager />}
    </div>
  );
}
