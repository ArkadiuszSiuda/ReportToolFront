import { Code } from "./code";
import { Product } from "./product";

export interface Report {
  comment: string;
  toReproduce: string;
  reproducibility: number;
  codeId: string;
  productId: string;
  code?: Code;
  product?: Product;
}
