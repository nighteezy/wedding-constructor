const path = require("path");
const weddingPreset = require("./tailwind.preset");

module.exports = {
  presets: [weddingPreset],
  content: [
    path.resolve(__dirname, "../../apps/*/src/**/*.{tsx,ts,jsx,js}"),
    path.resolve(__dirname, "../ui/src/**/*.{tsx,ts,jsx,js}"),
  ],
};
