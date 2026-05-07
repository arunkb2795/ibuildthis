import Link from "next/link";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Button } from "../ui/button";
import { InferSelectModel } from "drizzle-orm";
import { products } from "@/db/schema";
import VotingButton from "../vote-button";

type Product = InferSelectModel<typeof products>;

const ProductCard = ({ product }: { product: Product }) => {
  const { id, name, description, tags, websiteUrl, voteCount } = product;



  return (
    <Link href={`/product/${product.slug}`}>
      <Card
        className="w-[300px] flex-1 h-full"
      >
        <CardHeader>
          <CardTitle>
            {name}{" "}
            {voteCount > 100 && <Badge variant="destructive">Featured</Badge>}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {tags?.map((tag: string) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
         <VotingButton id={id} voteCount={voteCount} />
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
