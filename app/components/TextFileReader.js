import fs from 'fs';

function TextFileReader() {
    // Path to your text file
    const filePath = './app/txtFiles/input.txt';
  
    // Read the content of the text file
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log(content);
    return (
      <div>
        <h1>Text File Content:</h1>
        <pre>{content}</pre>
      </div>
    );
  }
  
  export default TextFileReader;