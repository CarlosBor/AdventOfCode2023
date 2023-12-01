import fs from 'fs';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import '../../styles/style.css';
import Link from 'next/link';

const Ejercicio = () =>{
    // Path to your text file
    const filePath = './app/txtFiles/input.txt';
    // Read the content of the text file
    const content = fs.readFileSync(filePath, 'utf-8');

    const otherPath = './app/Ejercicios/1/page.js';
    const otherContent = fs.readFileSync(otherPath, 'utf-8');

    const arrayContent = content.split('\n');
    /***********************************************/
    /**************Primera parte********************/
    /***********************************************/
    let sum = 0;
    let number;
    for (let i=0; i<arrayContent.length;i++){
        number = `${findFirstDigit(arrayContent[i]) + findLastDigit(arrayContent[i])}`;
        number = parseInt(number);
        sum = sum + number;
    }
    let result = sum;

    /***********************************************/
    /**************Segunda parte********************/
    /***********************************************/
    let sum2 = 0;
    let number2;
    for(let j=0; j<arrayContent.length;j++){
        number2 = findFirstWord(arrayContent[j]);
        sum2 = sum2 + number2;
    }
    let result2 = sum2;

    /***********************************************/
    /*******************Output**********************/
    /***********************************************/
    return(<>
        <div className="bodyWrapper">
            <div className="textWrapper">
                <h3>Advent of Code 2023</h3>
                <Link href='https://adventofcode.com/2023/day/1' className="link">Link a prueba original =&gt;</Link>
                <ol>
                    <li>Dado un texto, formar un número de dos dígitos con el primer y el último números de cada línea. Responder con la suma total de esos números.</li>
                    <li>Sobre el mismo texto, tener ahora en cuenta números escritos con letras tales como &apos;eight&apos; o &apos;five&apos;</li>
                </ol>
                <p>La solución a la primera version es: {result}</p>
                <p>La solución a la segunda version es: {result2}</p>
                <p>Con este input:</p>
                <textarea value={content}/>
            </div>
            <div className="codeWrapper">
                <SyntaxHighlighter language="javascript" style={tomorrowNightEighties}>
                    {otherContent}
                </SyntaxHighlighter>
            </div>
        </div>
    </>)
}


const findFirstDigit = (text) =>{
    const numbers = ['0','1','2','3','4','5','6','7','8','9'];
    const letters = text.split('');
    for(let i=0; i<letters.length; i++){
        if (numbers.includes(letters[i])){
            return letters[i];
        }
    }
}

const findLastDigit = (text) =>{
    const numbers = ['0','1','2','3','4','5','6','7','8','9'];
    const letters = text.split('');
    for(let i=letters.length; i>=0; i--){
        if (numbers.includes(letters[i])){
            return letters[i];
        }
    }
}

const findFirstDigitWithIndex = (text, reverse) =>{
    let letters = text.split('');
    if(reverse){
        letters.reverse();
    }
    const numbers = ['0','1','2','3','4','5','6','7','8','9'];
    for(let i=0; i<letters.length; i++){
        if (numbers.includes(letters[i])){
            return {
                position: i+"",
                number: letters[i]+""
            }
        }
    }
}

const findFirstWordWithIndex = (text, reverse) =>{
    let words;
    if(!reverse){
        words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    }else{
        words = ['orez','eno', 'owt', 'eerht', 'ruof', 'evif', 'xis', 'neves', 'thgie', 'enin'];
        text = text.split('').reverse().join('');
    }
    let storedIndex;
    let storedValue;
    //For each number 'word' like 'zero' or 'one':
    for(let j=0; j<words.length; j++){
        //Check if there is an occurrence within the text
        let indexOfTheWord = text.indexOf(words[j]);
        if(indexOfTheWord != -1){
            //If there is and I don't have any value stored, get the value and index
            if (storedIndex==undefined){
                storedIndex = indexOfTheWord;
                storedValue = j;
                //If I already have some, see if it appears earlier than the one i have, then store those if that's the case.
            }else if(storedIndex > indexOfTheWord){
                storedIndex = indexOfTheWord;
                storedValue = j;
            }
        }
    }
    return{
        position: storedIndex+"",
        number: storedValue+""
    }
}

const findFirstWord = (text) =>{
    let firstNumber;

    const firstDigitAndPosition = findFirstDigitWithIndex(text);
    const firstWordAndPosition = findFirstWordWithIndex(text, false);

    if(firstWordAndPosition.position!="undefined"){
        if(parseInt(firstWordAndPosition.position)<parseInt(firstDigitAndPosition.position)){
            firstNumber = firstWordAndPosition.number;
        }else{
            firstNumber = firstDigitAndPosition.number;
        }
    }else{
        firstNumber = firstDigitAndPosition.number;
    }

    //reversing the string!
    let secondNumber;

    const secondDigitAndPosition = findFirstDigitWithIndex(text, true);
    const secondWordAndPosition = findFirstWordWithIndex(text, true);
    if(secondWordAndPosition.position!="undefined"){
        if(parseInt(secondWordAndPosition.position)<parseInt(secondDigitAndPosition.position)){
            secondNumber = secondWordAndPosition.number;
        }else{
            secondNumber = secondDigitAndPosition.number;
        }
    }else{
        secondNumber = secondDigitAndPosition.number;
    }
    return parseInt(firstNumber+secondNumber);
}

export default Ejercicio;