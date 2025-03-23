import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function EditJobLoadingSkeleton() {
    return (
        <div>
            <Skeleton className="h-12 w-1/4"/>
            <div className="grid grid-cols-1 gap-6 mt-4">
                <Skeleton className="h-16 w-full"/>
                <Skeleton className="h-16 w-full"/>
                <Skeleton className="h-16 w-full"/>
                <Skeleton className="h-16 w-full"/>
                <Skeleton className="h-16 w-full"/>
                <Skeleton className="h-16 w-full"/>
                <Skeleton className="h-16 w-full"/>
                <Skeleton className="h-16 w-full"/>
            </div>
        </div>
    )
}