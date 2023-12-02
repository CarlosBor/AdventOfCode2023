import fs from 'fs';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import '../../styles/style.css';
import Link from 'next/link';

const Ejercicio = () =>{
    const filePath = './app/txtFiles/input2.txt';
    const content = fs.readFileSync(filePath, 'utf-8');

    const thisPath = './app/Ejercicios/2/page.js';
    const thisContent = fs.readFileSync(thisPath, 'utf-8');

    const arrayContent = content.split('\n');
    /***********************************************/
    /**************Primera parte********************/
    /***********************************************/
    let result = 0;
    let result2 = 0;
    for(let i=0; i<arrayContent.length; i++){
        arrayContent[i] = arrayContent[i].replace('\r', '');
        arrayContent[i] = arrayContent[i].split(':');
        arrayContent[i][1] = arrayContent[i][1].split(';');
    }
    const totalCubes = {
        red:12,
        green:13,
        blue:14
    }
    countCubesInGame(arrayContent[0]);
    for(let i=0; i<arrayContent.length; i++){
        let countedCubes = countCubesInGame(arrayContent[i]);
        if (gameIsPossible(countedCubes, totalCubes)){
            result = result + i+1;
        }
    }
    /***********************************************/
    /**************Segunda parte********************/
    /***********************************************/
    for(let i=0; i<arrayContent.length; i++){
        let countedCubes = countCubesInGame(arrayContent[i]);
        countedCubes.red = countedCubes.red || 1;
        countedCubes.green = countedCubes.green || 1;
        countedCubes.blue = countedCubes.blue || 1;
        result2 = result2 + (countedCubes.red*countedCubes.green*countedCubes.blue);
    }

    /***********************************************/
    /*******************Output**********************/
    /***********************************************/
    return(<>
        <div className="bodyWrapper">
            <div className="textWrapper">
                <h3>Advent of Code 2023</h3>
                <Link href='https://adventofcode.com/2023/day/2' className="link">Link a prueba original =&gt;</Link>
                <ol>
                    <li>El texto describe rondas de un juego. Cada ronda se sacan cubos de colores de una bolsa, separados por ;.
                        Asumiendo que sòlo hubiera 12 cubos rojos, 13 verdes y 14 azules, que partidas serían posibles? Sumar el nº de todas las partidas posibles
                    </li>
                    <li>Sobre las mismas partidas, cual es el número mínimo de cubos para hacerlas posibles? sumar la multiplicacion del nº de cubos mínimo por cada partida</li>
                </ol>
                <p>La solución a la primera version es: {result}</p>
                <p>La solución a la segunda version es: {result2}</p>
                <p>Con este input:</p>
                <textarea readOnly value={content}/>
            </div>
            <div className="codeWrapper">
                <SyntaxHighlighter language="javascript" style={tomorrowNightEighties}>
                    {thisContent}
                </SyntaxHighlighter>
            </div>
        </div>
    </>)
}


    /***********************************************/
    /**************Helper functions*****************/
    /***********************************************/
    const countCubesInGame = (arrayGame) =>{
        let gameInfo = arrayGame[1];
        let textCubesAndCount;
        let numberOfCubes;
        let Cubes = {
            red:0,
            blue:0,
            green:0
        }
        for (let i=0; i<gameInfo.length; i++){
            textCubesAndCount = gameInfo[i].split(',');
            for(let j=0; j<textCubesAndCount.length; j++){
                numberOfCubes = parseInt(textCubesAndCount[j]);
                if(textCubesAndCount[j].indexOf('red')!=-1){
                    if(Cubes.red<numberOfCubes){
                        Cubes.red=numberOfCubes;
                    }
                }else if(textCubesAndCount[j].indexOf('blue')!=-1){
                    if(Cubes.blue<numberOfCubes){
                        Cubes.blue=numberOfCubes;
                    }
                }else if(textCubesAndCount[j].indexOf('green')!=-1){
                    if(Cubes.green<numberOfCubes){
                        Cubes.green=numberOfCubes;
                    }
                }
            }
        }
        return Cubes;
    }

    const gameIsPossible = (CubesInGame, totalCubes) =>{
        if(CubesInGame.red>totalCubes.red || CubesInGame.green>totalCubes.green || CubesInGame.blue>totalCubes.blue){
            return false;
        }
        return true;
    }

export default Ejercicio;