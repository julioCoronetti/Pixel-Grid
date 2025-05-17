import { useEffect, useState } from "react";
import { PixelGrid } from "./components/PixelGrid";
import { Toolbar } from "./components/Toolbar";
import type { Pixel } from "./types/Pixel";

const URL = "https://pixel-grid-02t8.onrender.com/";

const App = () => {
	const [selectedColor, setSelectedColor] = useState("black");
	const [grid, setGrid] = useState<Pixel[]>([]);

	useEffect(() => {
		fetch(`${URL}/grid`)
			.then((response) => response.json())
			.then((data) => setGrid(data.grid))
			.catch((error) => console.error("Error fetching grid data:", error));
	}, []);

	const updateColor = async (x: number, y: number) => {
		try {
			const response = await fetch(`${URL}/setGridColor`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ x, y, color: selectedColor }),
			});
			const { grid: updatedGrid } = await response.json();
			setGrid(updatedGrid);
		} catch (error) {
			console.error("Error updating grid color:", error);
		}
	};

	return (
		<div className="h-full flex flex-col justify-center items-center gap-10">
			<h1 className="text-5xl font-bold bg-gradient-to-r from-rose-500 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
				Pixel Grid
			</h1>
			<PixelGrid grid={grid} updateColor={updateColor} />
			<Toolbar
				selectedColor={selectedColor}
				setSelectedColor={setSelectedColor}
			/>
		</div>
	);
};

export default App;
