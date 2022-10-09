import { Code } from "./code";
import { Product } from "./product";

export interface Report {
  id?: string;
  comment: string;
  toReproduce: string;
  reproducibility: number;
  codeId: string;
  productId: string;
  code?: Code;
  product?: Product;
}
