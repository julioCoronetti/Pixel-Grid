import type { Pixel } from "../types/Pixel";

type PixelGridProps = {
	grid: Pixel[];
	updateColor: (x: number, y: number) => void;
};

export const PixelGrid = ({ grid, updateColor }: PixelGridProps) => {
	return (
		<div
			className="grid bg-gray-300 gap-[1px] p-[1px]
			grid-cols-[repeat(20,20px)] grid-rows:repeat(20,20px) max-[440px]:grid-cols-[repeat(20,4vw)] max-[440px]:grid-rows-[repeat(20,4vw)]"
		>
			{grid.map((cell) => (
				<div
					key={`${cell.x}-${cell.y}`}
					className="w-[20px] h-[20px] cursor-pointer hover:scale-125 hover:border hover:border-gray-500 hover:shadow-lg hover:shadow-black/30 max-[440px]:w-[4vw] max-[440px]:h-[4vw]"
					style={{
						backgroundColor: cell.color,
						gridColumnStart: cell.x + 1,
						gridRowStart: cell.y + 1,
					}}
					onClick={() => updateColor(cell.x, cell.y)}
				></div>
			))}
		</div>
	);
};
