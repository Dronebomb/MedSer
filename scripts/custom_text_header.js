// Custom Text Header - MedSer login page
// Each entry is pre-rendered ASCII art. Add more entries to the array to expand the pool.
// A random entry is chosen on every page load.
// To add new text: generate ASCII art at patorjk.com/software/taag, escape backslashes (\  ->  \\), and add a new template literal entry.

const ascii_headers = [
  // Bloody
  ` @@@@@@@  @@@@@@@@      @@@  @@@  @@@@@@  @@@@@@@       @@@@@@  @@@@@@@@ @@@@@@@   @@@@@@  @@@ @@@@@@@ 
 @@!  @@@ @@!           @@!@!@@@ @@!  @@@   @@!        @@!  @@@ @@!      @@!  @@@ @@!  @@@ @@! @@!  @@@
 @!@!@!@  @!!!:!        @!@@!!@! @!@  !@!   @!!        @!@!@!@! @!!!:!   @!@!!@!  @!@!@!@! !!@ @!@  !@!
 !!:  !!! !!:           !!:  !!! !!:  !!!   !!:        !!:  !!! !!:      !!: :!!  !!:  !!! !!: !!:  !!!
 :: : ::  : :: :::      ::    :   : :. :     :          :   : :  :        :   : :  :   : : :   :: :  : 
                                                                                                       
`,

  // BlurVision
  `   _     _      _     _        _     _      _     _      _     _        _     _      _     _      _     _      _     _      _     _      _     _   
  (c).-.(c)    (c).-.(c)      (c).-.(c)    (c).-.(c)    (c).-.(c)      (c).-.(c)    (c).-.(c)    (c).-.(c)    (c).-.(c)    (c).-.(c)    (c).-.(c)  
   / ._. \\      / ._. \\        / ._. \\      / ._. \\      / ._. \\        / ._. \\      / ._. \\      / ._. \\      / ._. \\      / ._. \\      / ._. \\   
 __\\( Y )/__  __\\( Y )/__    __\\( Y )/__  __\\( Y )/__  __\\( Y )/__    __\\( Y )/__  __\\( Y )/__  __\\( Y )/__  __\\( Y )/__  __\\( Y )/__  __\\( Y )/__ 
(_.-/'-'\\-._)(_.-/'-'\\-._)  (_.-/'-'\\-._)(_.-/'-'\\-._)(_.-/'-'\\-._)  (_.-/'-'\\-._)(_.-/'-'\\-._)(_.-/'-'\\-._)(_.-/'-'\\-._)(_.-/'-'\\-._)(_.-/'-'\\-._)
   || B ||      || E ||        || N ||      || O ||      || T ||        || A ||      || F ||      || R ||      || A ||      || I ||      || D ||   
 _.' \`-' '._  _.' \`-' '._    _.' \`-' '._  _.' \`-' '._  _.' \`-' '._    _.' \`-' '._  _.' \`-' '._  _.' \`-' '._  _.' \`-' '._  _.' \`-' '._  _.' \`-' '._ 
(.-./\`-'\\.-.)(.-./\`-'\\.-.)  (.-./\`-'\\.-.)(.-./\`-'\\.-.)(.-./\`-'\\.-.)  (.-./\`-'\\.-.)(.-./\`-'\\.-.)(.-./\`-\`\\.-.)(.-./\`-'\\.-.)(.-./\`-'\\.-.)(.-./\`-'\\.-.)
 \`-'     \`-'  \`-'     \`-'    \`-'     \`-'  \`-'     \`-'  \`-'     \`-'    \`-'     \`-'  \`-'     \`-'  \`-'     \`-'  \`-'     \`-'  \`-'     \`-'  \`-'     \`-' 
`,

  // RubiFont
  ` ___                     __             
| o ) _    _  _ ||   _  / _| _  _  () ||
| o \\/o\\ |/ \\/o\\| ] /o\\ | ] /_|/o\\ ||/o|
|___/\\(  L_n|\\_/L|  \\_,]L|  L| \\_,]L|\\_|
                                        
`,

];

const chosen = ascii_headers[Math.floor(Math.random() * ascii_headers.length)];

const custom_text_header = `
<style>
  .custom-text-header {
    width: 100%;
    text-align: center;
    overflow: hidden;
  }
  .custom-text-header pre {
    display: inline-block;
    font-size: clamp(4px, 0.45vw, 13px);
    line-height: 1.3;
    white-space: pre;
    margin: 0 auto;
  }
</style>
<div class="custom-text-header"><pre>${chosen}</pre></div>
`;

document.getElementById("login").innerHTML += custom_text_header;
