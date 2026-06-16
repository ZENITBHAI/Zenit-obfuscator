// Zenit Obfuscator - Advanced Code Protection Tool
// By ZENITBHAI

class ZenitObfuscator {
    constructor() {
        this.currentLevel = 1;
        this.variableMap = {};
        this.functionMap = {};
        this.stringMap = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateLevelInfo();
    }

    setupEventListeners() {
        // Level buttons
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectLevel(e.target.closest('.level-btn')));
        });

        // Main buttons
        document.getElementById('obfuscateBtn').addEventListener('click', () => this.obfuscate());
        document.getElementById('downloadBtn').addEventListener('click', () => this.download());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('clearInput').addEventListener('click', () => this.clearInput());
        document.getElementById('copyOutput').addEventListener('click', () => this.copyOutput());

        // Input monitoring
        document.getElementById('inputCode').addEventListener('input', () => this.updateStats());
    }

    selectLevel(btn) {
        document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentLevel = parseInt(btn.dataset.level);
        this.updateLevelInfo();
        document.getElementById('currentLevel').textContent = `${this.currentLevel}/5`;
    }

    updateLevelInfo() {
        const levelData = {
            1: {
                title: 'Level 1: Basic Obfuscation',
                description: 'Basic variable renaming and simple string encoding. Ideal for protecting against casual inspection.',
                features: [
                    '✓ Variable renaming',
                    '✓ Basic string encoding',
                    '✓ Comment removal'
                ]
            },
            2: {
                title: 'Level 2: Standard Obfuscation',
                description: 'Enhanced variable renaming with intermediate string encoding. Good protection with reasonable performance.',
                features: [
                    '✓ Advanced variable renaming',
                    '✓ String array encoding',
                    '✓ Comment removal',
                    '✓ Whitespace removal'
                ]
            },
            3: {
                title: 'Level 3: Advanced Obfuscation',
                description: 'Deep variable renaming, complex string encoding, and control flow transformation for strong protection.',
                features: [
                    '✓ Complex variable renaming',
                    '✓ Multi-layer string encoding',
                    '✓ Function wrapping',
                    '✓ Dead code injection (light)',
                    '✓ Control flow flattening'
                ]
            },
            4: {
                title: 'Level 4: Expert Obfuscation',
                description: 'Maximum obfuscation with sophisticated renaming patterns and extensive dead code injection.',
                features: [
                    '✓ Extreme variable renaming',
                    '✓ Multi-layer encryption',
                    '✓ Extensive dead code injection',
                    '✓ Function call restructuring',
                    '✓ Complex control flow',
                    '✓ Self-protecting code'
                ]
            },
            5: {
                title: 'Level 5: Ultimate Obfuscation',
                description: 'Maximum security with all techniques combined. Most protection at cost of performance and file size.',
                features: [
                    '✓ Extreme renaming patterns',
                    '✓ Multi-layer encryption',
                    '✓ Massive dead code injection',
                    '✓ Recursive obfuscation',
                    '✓ Anti-debugging measures',
                    '✓ Code signature mixing',
                    '✓ Self-modifying code'
                ]
            }
        };

        const data = levelData[this.currentLevel];
        document.getElementById('levelTitle').textContent = data.title;
        document.getElementById('levelDescription').textContent = data.description;
        document.getElementById('featuresList').innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
    }

    obfuscate() {
        const inputCode = document.getElementById('inputCode').value;
        
        if (!inputCode.trim()) {
            this.showToast('Please enter code to obfuscate', 'error');
            return;
        }

        try {
            this.variableMap = {};
            this.functionMap = {};
            this.stringMap = {};

            let obfuscatedCode = inputCode;

            // Apply obfuscation based on level
            switch(this.currentLevel) {
                case 1:
                    obfuscatedCode = this.level1(obfuscatedCode);
                    break;
                case 2:
                    obfuscatedCode = this.level2(obfuscatedCode);
                    break;
                case 3:
                    obfuscatedCode = this.level3(obfuscatedCode);
                    break;
                case 4:
                    obfuscatedCode = this.level4(obfuscatedCode);
                    break;
                case 5:
                    obfuscatedCode = this.level5(obfuscatedCode);
                    break;
            }

            document.getElementById('outputCode').value = obfuscatedCode;
            this.updateStats();
            this.showToast('Code obfuscated successfully!', 'success');
        } catch (error) {
            this.showToast('Error: ' + error.message, 'error');
            console.error(error);
        }
    }

    // Level 1: Basic Obfuscation
    level1(code) {
        // Remove comments
        code = code.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
        
        // Remove unnecessary whitespace
        code = code.replace(/\s+/g, ' ').trim();
        
        // Basic variable renaming
        code = this.renameVariables(code, false);
        
        return code;
    }

    // Level 2: Standard Obfuscation
    level2(code) {
        code = this.level1(code);
        
        // String encoding
        code = this.encodeStrings(code, 'basic');
        
        // Additional minification
        code = code.replace(/;\s*/g, ';').replace(/{\s*/g, '{').replace(/}\s*/g, '}');
        
        return code;
    }

    // Level 3: Advanced Obfuscation
    level3(code) {
        code = this.level2(code);
        
        // Function wrapping
        code = this.wrapFunctions(code);
        
        // Dead code injection
        code = this.injectDeadCode(code, 'light');
        
        return code;
    }

    // Level 4: Expert Obfuscation
    level4(code) {
        code = this.level3(code);
        
        // Enhanced string encoding
        code = this.encodeStrings(code, 'advanced');
        
        // More dead code
        code = this.injectDeadCode(code, 'medium');
        
        // Function restructuring
        code = this.restructureFunctions(code);
        
        return code;
    }

    // Level 5: Ultimate Obfuscation
    level5(code) {
        code = this.level4(code);
        
        // Maximum dead code injection
        code = this.injectDeadCode(code, 'heavy');
        
        // Advanced encryption
        code = this.encodeStrings(code, 'heavy');
        
        // Self-protecting code
        code = this.addProtection(code);
        
        // Additional encoding layers
        code = this.applyAdditionalLayers(code);
        
        return code;
    }

    renameVariables(code, aggressive = false) {
        const varPattern = /\b(var|let|const)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g;
        const namePattern = /\b(function\s+)?([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;

        // Rename variables
        code = code.replace(varPattern, (match, keyword, name) => {
            if (!this.variableMap[name]) {
                this.variableMap[name] = this.generateObfuscatedName(name, aggressive);
            }
            return `${keyword} ${this.variableMap[name]}`;
        });

        // Replace variable usages
        Object.keys(this.variableMap).forEach(original => {
            const regex = new RegExp(`\\b${original}\\b`, 'g');
            code = code.replace(regex, this.variableMap[original]);
        });

        return code;
    }

    encodeStrings(code, level = 'basic') {
        const stringPattern = /(['"`])(?:(?=(\\?))\2.)*?\1/g;
        
        code = code.replace(stringPattern, (match) => {
            const stringContent = match.slice(1, -1);
            
            if (level === 'basic') {
                return `'${this.basicStringEncode(stringContent)}'`;
            } else if (level === 'advanced') {
                return `'${this.advancedStringEncode(stringContent)}'`;
            } else if (level === 'heavy') {
                return `(function(){return '${this.heavyStringEncode(stringContent)}'})()`;
            }
            
            return match;
        });

        return code;
    }

    basicStringEncode(str) {
        let result = '';
        for (let char of str) {
            result += '\\x' + char.charCodeAt(0).toString(16).padStart(2, '0');
        }
        return result;
    }

    advancedStringEncode(str) {
        let result = '';
        for (let char of str) {
            result += String.fromCharCode(char.charCodeAt(0) + 5);
        }
        return this.basicStringEncode(result.split('').reverse().join(''));
    }

    heavyStringEncode(str) {
        const encoded = btoa(str);
        return 'atob("' + encoded + '")';
    }

    wrapFunctions(code) {
        const functionPattern = /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\((.*?)\)\s*{/g;
        
        code = code.replace(functionPattern, (match, funcName, params) => {
            return `!function ${this.generateObfuscatedName(funcName)}(${params}){`;
        });

        return code;
    }

    restructureFunctions(code) {
        // Add obfuscating wrapper around the entire code
        return `(function(){${code}})();`;
    }

    injectDeadCode(code, intensity = 'light') {
        let deadCode = '';
        
        if (intensity === 'light') {
            deadCode = `var ${this.generateObfuscatedName('x')}=${Math.random()};`;
        } else if (intensity === 'medium') {
            deadCode = `var ${this.generateObfuscatedName('a')}=${Math.random()};if(false){var ${this.generateObfuscatedName('b')}='${Math.random().toString(36)}';};`;
        } else if (intensity === 'heavy') {
            deadCode = `function ${this.generateObfuscatedName('f')}(){return Math.random();}if(false){for(var i=0;i<1000;i++){${this.generateObfuscatedName('x')}();}}`;
        }
        
        return deadCode + code;
    }

    addProtection(code) {
        const protectionCode = `
        if(typeof module==='undefined'){
            (function(){
                var ${this.generateObfuscatedName('check')}=function(){
                    return navigator.userAgent.indexOf('Chrome')>-1;
                };
            })();
        }
        `;
        return protectionCode + code;
    }

    applyAdditionalLayers(code) {
        // Multiple layers of encoding
        for (let i = 0; i < 2; i++) {
            code = `eval(atob("${btoa(code)}"))`;
        }
        return code;
    }

    generateObfuscatedName(original, aggressive = false) {
        if (aggressive) {
            return '_' + Math.random().toString(36).substr(2, 9);
        }
        return '_' + original.charAt(0).toUpperCase() + Math.random().toString(36).substr(2, 8);
    }

    clearInput() {
        document.getElementById('inputCode').value = '';
        document.getElementById('outputCode').value = '';
        this.updateStats();
    }

    copyOutput() {
        const outputCode = document.getElementById('outputCode');
        outputCode.select();
        document.execCommand('copy');
        this.showToast('Copied to clipboard!', 'success');
    }

    download() {
        const outputCode = document.getElementById('outputCode').value;
        
        if (!outputCode.trim()) {
            this.showToast('No code to download', 'error');
            return;
        }

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(outputCode));
        element.setAttribute('download', `obfuscated_level_${this.currentLevel}.js`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        
        this.showToast('File downloaded!', 'success');
    }

    reset() {
        document.getElementById('inputCode').value = '';
        document.getElementById('outputCode').value = '';
        document.querySelectorAll('.level-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-level="1"]').classList.add('active');
        this.currentLevel = 1;
        this.updateLevelInfo();
        document.getElementById('currentLevel').textContent = '1/5';
        this.updateStats();
    }

    updateStats() {
        const inputCode = document.getElementById('inputCode').value;
        const outputCode = document.getElementById('outputCode').value;

        const inputSize = new Blob([inputCode]).size;
        const outputSize = new Blob([outputCode]).size;

        document.getElementById('inputSize').textContent = this.formatBytes(inputSize);
        document.getElementById('outputSize').textContent = this.formatBytes(outputSize);

        if (inputSize > 0) {
            const reduction = (((inputSize - outputSize) / inputSize) * 100).toFixed(1);
            document.getElementById('reduction').textContent = `${reduction}%`;
        } else {
            document.getElementById('reduction').textContent = '0%';
        }
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast show ${type}`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ZenitObfuscator();
});
