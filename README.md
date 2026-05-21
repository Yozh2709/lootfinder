# Minecraft Loot Predictor

A web-based Minecraft structure loot predictor powered by [cubiomes](https://github.com/Cubitect/cubiomes) compiled to WebAssembly.

## Live Demo

Visit the GitHub Pages site to use the tool: `https://YOUR_USERNAME.github.io/cubiomes-loot/`

## How to Use

1. Enter your Minecraft world seed
2. Select the structure type (Igloo, Desert Pyramid, etc.)
3. Set the search radius (default 5000 blocks)
4. Click **Search Loot**

The tool will show:
- Structure locations with `/tp` commands
- Chest positions
- Predicted loot contents for each chest

## Supported Structures

| Structure | Status |
|-----------|--------|
| Igloo | ✅ Working |
| Desert Pyramid | ✅ Working |
| Jungle Temple | ✅ Working |
| Pillager Outpost | ✅ Working |
| Shipwreck | ✅ Working |
| Ruined Portal | ✅ Working |
| Buried Treasure | ✅ Working |
| Bastion | ✅ Working |
| Nether Fortress | ✅ Working |
| End City | ✅ Working |
| Stronghold | ✅ Working |
| Ancient City | ✅ Working (~98% chests accurate; affected chests show warning) |
| Ominous Vault | ✅ Working (predicts loot for any seed) |

## How It Works

- The cubiomes C library is compiled to WebAssembly using Emscripten
- All loot tables are embedded as compiled C code (Minecraft 1.21 data)
- Biome generation and structure placement run entirely in the browser
- No server required — completely client-side

## Building from Source

### Requirements
- Emscripten SDK
- MinGW GCC (for testing native builds)
- Windows with PowerShell

### Build WASM
```bash
cd cubiomes-master
emcc wasm_api.c wasm_ancient_city.c wasm_ominous_vault.c finders.c biomes.c biomenoise.c generator.c layers.c noise.c util.c quadbase.c loot/loot_tables.c loot/loot_table_context.c loot/loot_functions.c loot/loot_table_parser.c loot/items.c loot/cjson/cJSON.c features/stronghold.c loot/loot_tables/*.c -O3 -s WASM=1 -s EXPORTED_FUNCTIONS='["_malloc","_free","_getStructureLoot","_getOminousVaultLoot"]' -s EXPORTED_RUNTIME_METHODS='["ccall","cwrap","UTF8ToString","stringToUTF8","lengthBytesUTF8"]' -s ALLOW_MEMORY_GROWTH=1 -s INITIAL_MEMORY=64MB -s MAXIMUM_MEMORY=256MB -s STACK_SIZE=1MB -s MODULARIZE=1 -s EXPORT_NAME="'CubiomesLoot'" -lm -I. -Iloot -Iloot/cjson -Iloot/loot_tables -Itables -Ifeatures -o cubiomes_loot.js
```

## Credits

- [cubiomes](https://github.com/Cubitect/cubiomes) by Cubitect
- [xpple's cubiomes fork](https://github.com/xpple/cubiomes) for loot table support
- Minecraft loot data extracted from Minecraft 1.21

## License

This project uses the same license as cubiomes (MIT/ISC depending on the component).
Minecraft is a trademark of Mojang Studios.
