import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  extra?: string[];
  href?: string;
  link?: string;
};

export const NoData = ({ description, href, title, extra, link }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent className="flex items-center text-center flex-col gap-4 justify-center flex-1">
        <h6 className="font-bold">{title}</h6>

        <p className="font-extralight text-sm">{description}</p>

        <div className="flex flex-col gap-y-1">
          {extra && extra.map((item) => <small key={item}>{item}</small>)}
        </div>

        <p className="text-sm text-muted-foreground">
          (O gráfico aparecerá aqui assim que os dados estiverem disponíveis!)
          🚀
        </p>

        {href && (
          <Link
            className={buttonVariants({
              variant: "primary",
              className: "mt-5",
            })}
            href={href}
          >
            {link}
          </Link>
        )}
      </CardContent>
    </Card>
  );
};
