import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function HomeLoadingSkeleton() {
    return (
        <div>
            <Skeleton className="h-12 w-1/4"/>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <Skeleton className="h-40 w-full"/>
                <Skeleton className="h-40 w-full"/>
                <Skeleton className="h-40 w-full"/>
                <Skeleton className="h-40 w-full"/>
                <Skeleton className="h-40 w-full"/>
                <Skeleton className="h-40 w-full"/>
                <Skeleton className="h-40 w-full"/>
                <Skeleton className="h-40 w-full"/>
                <Skeleton className="h-40 w-full"/>
                <Skeleton className="h-40 w-full"/>
            </div>
        </div>
    )
}