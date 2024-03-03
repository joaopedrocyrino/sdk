const fs = require("fs");

const [packageName] = process.argv.slice(2);

if (!packageName) throw "No package name passed. Stopping further execution.";

const packageFolderPath = `packages/${packageName}`;

if (fs.existsSync(packageFolderPath))
  throw "Package already exists. Stopping further execution.";

const formattedPackageName = packageName
  .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
  .toLowerCase();

const firstLetterUpperCasePackageName =
  packageName.charAt(0).toUpperCase() + packageName.slice(1);

//
//
// ========= CREATE FOLDER ==========

console.log("1- Creating folder ...");
fs.mkdirSync(packageFolderPath);

//
//
// ========= PACKAGE.JSON ==========

fs.writeFileSync(
  `${packageFolderPath}/package.json`,
  JSON.stringify(
    {
      name: `@joaopedrocyrino/${formattedPackageName}`,
      version: "0.0.0",
      license: "UNLICENSED",
      main: "./dist/cjs.min.js",
      module: "./dist/es.min.js",
      types: "./dist/types/index.d.ts",
      files: [
        "dist/types/*",
        "dist/es.min.js",
        "dist/es.min.js.map",
        "dist/cjs.min.js",
        "dist/cjs.min.js.map",
      ],
      author: "João Cyrino",
      homepage: `https://github.com/joaopedrocyrino/sdk/tree/main/packages/${packageName}`,
      repository: {
        type: "git",
        url: "git+https://github.com/joaopedrocyrino/sdk.git",
        directory: `packages/${packageName}`,
      },
      scripts: {
        build:
          "concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types' && npx webpack",
        "build:cjs": "tsc -p tsconfig.cjs.json",
        "build:es": "tsc -p tsconfig.es.json",
        "build:types": "tsc -p tsconfig.types.json",
        clean: "rimraf ./dist",
        size: "size-limit",
        test: "jest",
      },
      publishConfig: {
        registry: "https://npm.pkg.github.com/@joaopedrocyrino",
      },
      "size-limit": [
        {
          path: "dist/cjs.min.js",
          limit: "100 KB",
        },
        {
          path: "dist/cjs.min.js.map",
          limit: "250 KB",
        },
      ],
      devDependencies: {
        webpack: "^5.88.1",
        "webpack-cli": "^5.1.4",
      },
      sideEffect: false,
    },
    undefined,
    2
  )
);
console.log("2- package.json✅");

//
//
// ========= TSCONFIG ==========

console.log("3- Creating tsconfig files...");
fs.writeFileSync(
  `${packageFolderPath}/tsconfig.cjs.json`,
  JSON.stringify(
    {
      compilerOptions: {
        baseUrl: ".",
        outDir: "dist/cjs",
        rootDir: "src",
      },
      extends: "../../tsconfig.cjs.json",
      include: ["src/"],
    },
    undefined,
    2
  )
);
console.log("3.1- tsconfig.cjs.json✅");

fs.writeFileSync(
  `${packageFolderPath}/tsconfig.es.json`,
  JSON.stringify(
    {
      compilerOptions: {
        baseUrl: ".",
        lib: [],
        outDir: "dist/es",
        rootDir: "src",
      },
      extends: "../../tsconfig.es.json",
      include: ["src/"],
    },
    undefined,
    2
  )
);
console.log("3.2- tsconfig.es.json✅");

fs.writeFileSync(
  `${packageFolderPath}/tsconfig.types.json`,
  JSON.stringify(
    {
      compilerOptions: {
        baseUrl: ".",
        declarationDir: "dist/types",
        rootDir: "src",
      },
      extends: "../../tsconfig.types.json",
      include: ["src/"],
    },
    undefined,
    2
  )
);
console.log("3.3- tsconfig.types.json✅");

//
//
// ========= CREATE SRC/ ==========

console.log("4- Creating src/ ...");
fs.mkdirSync(`${packageFolderPath}/src`);

let controllerContent = fs
  .readFileSync("scripts/createPackage/src/controller.ts", "utf-8")
  .toString();
controllerContent = controllerContent.replaceAll(
  "PACKAGE_NAME",
  firstLetterUpperCasePackageName
);

fs.writeFileSync(`${packageFolderPath}/src/controller.ts`, controllerContent);
console.log("4.1- src/controller.ts✅");

const dtoContent = fs
  .readFileSync("scripts/createPackage/src/dto.ts", "utf-8")
  .toString();

fs.writeFileSync(`${packageFolderPath}/src/dto.ts`, dtoContent);
console.log("4.2- src/dto.ts✅");

const indexContent = fs
  .readFileSync("scripts/createPackage/src/index.ts", "utf-8")
  .toString();

fs.writeFileSync(`${packageFolderPath}/src/index.ts`, indexContent);
console.log("4.3- src/index.ts✅");

//
//
// ========= CREATE __TESTS__/ ==========

console.log("5- Creating __tests__/ ...");
fs.mkdirSync(`${packageFolderPath}/__tests__/`);

let testContent = fs
  .readFileSync("scripts/createPackage/__tests__/sample.test.ts", "utf-8")
  .toString();
testContent = testContent.replaceAll(
  "PACKAGE_NAME",
  firstLetterUpperCasePackageName
);

fs.writeFileSync(
  `${packageFolderPath}/__tests__/${packageName}.test.ts`,
  testContent
);
console.log(`5.1- __tests__/${packageName}.test.ts✅`);

//
//
// ========= CREATE WEBPACK.CONFIG.JS ==========

console.log("6- Creating webpack.config.js ...");

const webpackContent = fs
  .readFileSync("scripts/createPackage/webpack.sample.js", "utf-8")
  .toString();

fs.writeFileSync(`${packageFolderPath}/webpack.config.js`, webpackContent);
console.log(`6- webpack.config.js✅`);

//
//
// ========= CREATE WEBPACK.CONFIG.JS ==========

console.log("7- Creating jest.config.js ...");

let jestContent = fs
  .readFileSync("scripts/createPackage/jest.sample.js", "utf-8")
  .toString();
jestContent = jestContent.replaceAll(
  "PACKAGE_NAME",
  firstLetterUpperCasePackageName
);

fs.writeFileSync(`${packageFolderPath}/jest.config.js`, jestContent);
console.log(`7- jest.config.js✅`);
