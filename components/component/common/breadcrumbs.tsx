import Link from "next/link";
import { BreadCrumb } from "@/types/common";
import { ArrowForwardIcon } from "@components/ui/Icons";


export function ContentManagerBreadcrumbs({
  breadcrumbs
}: {
  breadcrumbs:BreadCrumb[]
}) {
  
  return (
    <div
      className="flex justify-start items-center gap-2"
    >
      {
        breadcrumbs.map((p, idx) => {
          return (
            <div
              key={ p.path }
              className="flex justify-center items-center gap-1"
            >
              {
                idx > 0 ? <ArrowForwardIcon className="fill-slate-400" width={ 16 } /> : <></>
              }
              <Link
                href={p.path}
                className="rounded text-slate-500 hover:bg-slate-200 px-1"
              >
                { p.name }
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}