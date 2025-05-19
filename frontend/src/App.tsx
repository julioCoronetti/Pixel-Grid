import { useEffect, useState } from "react";
import { PixelGrid } from "./components/PixelGrid";
import { Toolbar } from "./components/Toolbar";
import type { Pixel } from "./types/Pixel";

const URL = "https://pixel-grid-02t8.onrender.com";

const App = () => {
	const [selectedColor, setSelectedColor] = useState("black");
	const [grid, setGrid] = useState<Pixel[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`${URL}/grid`)
			.then((response) => response.json())
			.then((data) => {
				setGrid(data.grid);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching grid data:", error);
				setLoading(false);
			});
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
		<div className="h-full flex flex-col justify-center items-center gap-5">
			<h1 className="text-5xl font-bold bg-gradient-to-r from-rose-500 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
				Pixel Grid
			</h1>
			<main className="flex items-center space-x-10 max-[768px]:flex-col max-[768px]:space-x-0 max-[768px]:space-y-5">
				{loading ? (
					<p className="text-4xl mt-20">Loading...</p>
				) : (
					<PixelGrid grid={grid} updateColor={updateColor} />
				)}
				<Toolbar
					selectedColor={selectedColor}
					setSelectedColor={setSelectedColor}
				/>
			</main>
		</div>
	);
};

export default App;
