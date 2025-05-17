import { Eraser } from "lucide-react";

type ToolbarProps = {
	selectedColor: string;
	setSelectedColor: (color: string) => void;
};

export const Toolbar = ({ selectedColor, setSelectedColor }: ToolbarProps) => {
	const colors = [
		"black",
		"red",
		"lightgreen",
		"lightskyblue",
		"yellow",
		"purple",
		"orange",
		"white",
	];
	return (
		<div className="flex m-[40px auto] p-[12px] border-1 border-gray-500 rounded-[32px] gap-[8px] max-[440px]:p-[2vw] max-[440px]:gap-[1vw]">
			{colors.map((color) => (
				<button
					key={color}
					className={`w-[40px] h-[40px] rounded-full border-2 border-white cursor-pointer flex justify-center items-center ${selectedColor === color ? "outline-[3px] outline-black shadow-lg shadow-black/30" : ""} max-[440px]:w-[10vw] max-[440px]:h-[10vw]`}
					style={{ backgroundColor: color }}
					onClick={() => setSelectedColor(color)}
				>
					{color === "white" ? <Eraser /> : ""}
				</button>
			))}
		</div>
	);
};
