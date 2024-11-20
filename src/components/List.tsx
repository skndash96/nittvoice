import End from "./End";
import CardSkeleton from "./CardSkeleton";

export default function List<T>({
	data,
	Item,
	loading,
	skeletonHeight,
	EmptyDataComponent,
	onEnd
}: {
	data: (T & { id: string }) [],
	Item: React.FC<{ data: T }>,
	loading: boolean,
	skeletonHeight: "sm" | "lg",
	EmptyDataComponent: React.FC,
	onEnd: () => void
}) {
	return (
		<ul className="pb-12 flex flex-col gap-4">
			{data.map(item => (
				<li key={item.id} className="">
					<Item data={item} />
				</li>
			))}
			
			{data.length === 0 && !loading && (
				<EmptyDataComponent />
			)}
			
            <div className="absolute z-10 left-0 right-0 bottom-0">
                <End onReach={onEnd} />
            </div>

            {loading && (
                <div className="flex flex-col gap-4">
                    {new Array(3).fill(null).map((_, i) => (
                        <CardSkeleton cardHeight={skeletonHeight} key={i} />
                    ))}
                </div>
            )}
		</ul>
	);
}