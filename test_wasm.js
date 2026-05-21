// test_wasm.js - Test WASM module in Node.js
const CubiomesLoot = require('./cubiomes_loot.js');

async function test() {
    console.log('Loading WASM module...');
    const module = await CubiomesLoot();
    
    const getLootPtr = module.cwrap('getStructureLoot', 'number', ['number', 'number', 'number']);
    
    const seedStr = "-6168393533729723991";
    const type = "igloo";
    
    const seedLen = seedStr.length * 4 + 1;
    const seedPtr = module._malloc(seedLen);
    module.stringToUTF8(seedStr, seedPtr, seedLen);
    
    const typeLen = type.length * 4 + 1;
    const typePtr = module._malloc(typeLen);
    module.stringToUTF8(type, typePtr, typeLen);
    
    console.log('Calling getStructureLoot...');
    const resultPtr = getLootPtr(seedPtr, typePtr, 10000);
    const jsonStr = module.UTF8ToString(resultPtr);
    
    module._free(seedPtr);
    module._free(typePtr);
    
    console.log('Raw output (first 500 chars):');
    console.log(jsonStr.substring(0, 500));
    console.log('...');
    console.log('Total length:', jsonStr.length);
}

test().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
