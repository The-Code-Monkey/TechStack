import fs from "fs-extra"

const generate = () => {
    fs.readdir('./src/icons', (err, res) => {
        fs.writeFile('./src/iconTypes.ts', `type IconTypes = ${res.map(file => `"${file.replace('.tsx', '').replace("-", "")}"`).join(" | ")}

export default IconTypes;
        `)
    });
}

generate();