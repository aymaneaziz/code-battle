import codeArenaLOGO from "./assets/Code_Arena.png";
import "./App.css";

function App() {
  return (
    <>
      <section
        id="center"
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8"
      >
        <div className="mb-8">
          <img
            src={codeArenaLOGO}
            className="w-162 h-162 object-contain"
            alt="Code Arena Logo"
          />
        </div>
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Aymane Negga
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            <code className="bg-gray-200 px-2 py-1 rounded">src/App.tsx</code>{" "}
            and save to test{" "}
            <code className="bg-gray-200 px-2 py-1 rounded">HMR</code>
          </p>
        </div>
      </section>
    </>
  );
}

export default App;
