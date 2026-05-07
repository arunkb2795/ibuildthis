"use client";
import { FormState, addProductAction } from "@/actions/product-action";
import FormFiled from "./forms/form-filed";
import { Button } from "./ui/button";
import { useActionState } from "react";
import { Loader2Icon, SparkleIcon } from "lucide-react";

export default function ProductForm() {
  const initialState = {
    success: false,
    error: {},
    message: "",
  };

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    addProductAction,
    initialState,
  );

  const { error } = state;

  return (
    <div className="space-y-4 m-16">
      <form className="space-y-4" action={formAction}>
        <FormFiled
          label="Product Name"
          name="name"
          placeholder="My awesome product"
          required
          onChange={() => {}}
          error={error?.name ? error.name[0] : undefined}
        />
        <FormFiled
          label="slug"
          name="slug"
          placeholder="my-awesome-product"
          required
          helperText="The slug is the URL friendly version of the product name. It is used to identify the product in the URL."
          onChange={() => {}}
          error={error?.slug ? error.slug[0] : undefined}
        />
        <FormFiled
          label="tagline"
          name="tagline"
          placeholder="A brief, catchy description of the product"
          required
          onChange={() => {}}
          error={error?.tagline ? error.tagline[0] : undefined}
        />
        <FormFiled
          label="description"
          name="description"
          placeholder="Tell us more about your product"
          required
          textarea
          onChange={() => {}}
          error={error?.description ? error.description[0] : undefined}
        />
        <FormFiled
          label="Website URL"
          name="websiteUrl"
          placeholder="https://www.yourproductwebsite.com"
          required
          helperText="The website URL is the URL of the product's website. It is used to link to the product's website."
          onChange={() => {}}
          error={error?.websiteUrl ? error.websiteUrl[0] : undefined}
        />
        <FormFiled
          label="Tags"
          name="tags"
          placeholder="AI, SaaS, Productivity"
          required
          helperText="Comma separated list of tags"
          onChange={() => {}}
          error={error?.tags ? error.tags[0] : undefined}
        />
        <Button type="submit" size="lg" className="w-full">
          {isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <SparkleIcon className="size-4" />
          )}
          Submit Product
        </Button>
      </form>
    </div>
  );
}
