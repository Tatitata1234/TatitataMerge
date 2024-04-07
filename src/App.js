import { useEffect, useState } from 'react';
import './App.css';
import { ImprimeNumeros } from './ui/imprimeNumeros';
import add from './assets/add.png'

export const alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
function App() {

  const linhaUm = [1, 1, 1, 1];
  const linhaDois = [1, 1, 1, 1];
  const linhaTres = [1, 1, 1, 1];
  const linhaQuatro = [1, 1, 1, 1];
  const [selecionadas, setSelecionadas] = useState([-1, -1])
  const [mapa, setMapa] = useState([linhaUm, linhaDois, linhaTres, linhaQuatro]);
  const [recarrega, setRecarrega] = useState(false);
  const [botoesDesligados, setBotoesDesligados] = useState(false);
  const inicioTela = 1
  const mensagemDefault = 'Selecione dois itens e clique no botão abaixo!'
  const [mensagemErro, setMensagemErro] = useState(mensagemDefault)
  const [erro, setErro] = useState('sucesso')

  function preencherMapa() {
    const mapaVazio = [linhaUm, linhaDois, linhaTres, linhaQuatro]
    const mapaPreenchido = mapaVazio.map(coluna => {
      return coluna.map((linha, index) => {
        const tipo = Math.floor(Math.random() * 2) + 1;
        if (tipo === 1) {
          return {
            tipo: 'num',
            valor: 1
          }
        } else {
          return {
            tipo: 'letra',
            valor: 'A'
          }
        }
      })
    })
    setMapa(mapaPreenchido)
  }

  useEffect(() => {
    async function fetch() {
      setRecarrega(false);
    }
    fetch()
  }, [recarrega])

  useEffect(() => {
    async function fetch() {
      preencherMapa()
    }
    fetch()
  }, [inicioTela])

  function onClickMerge() {
    if (selecionadas[0] === -1 || selecionadas[1] === -1) {
      setMensagemErro('Selecione 2 itens para fazer o merge!')
      setErro('erro')
      return
    }
    const linhaZero = Math.floor(selecionadas[0] / 4)
    const colunhaZero = selecionadas[0] % 4
    const linhaUma = Math.floor(selecionadas[1] / 4)
    const colunhaUma = selecionadas[1] % 4

    const mapaTemporario = mapa
    if (linhaZero === linhaUma && colunhaZero === colunhaUma) {
      setMensagemErro('Selecione mais de um item!')
      setErro('erro')
      return
    } else if (mapaTemporario[linhaZero][colunhaZero].valor !== mapaTemporario[linhaUma][colunhaUma].valor) {
      setMensagemErro('Selecione itens iguais!')
      setErro('erro')
      return
    } else if (mapaTemporario[linhaZero][colunhaZero].tipo === 'num') {
      const tipo = Math.floor(Math.random() * 2) + 1;
      let objeto
      if (tipo === 1) {
        objeto = {
          tipo: 'num',
          valor: 1
        }
      } else {
        objeto = {
          tipo: 'letra',
          valor: 'A'
        }
      }
      mapaTemporario[linhaZero][colunhaZero] = objeto;
      mapaTemporario[linhaUma][colunhaUma].valor *= 2;
    } else {
      const tipo = Math.floor(Math.random() * 2) + 1;
      let objeto
      if (tipo === 1) {
        objeto = {
          tipo: 'num',
          valor: 1
        }
      } else {
        objeto = {
          tipo: 'letra',
          valor: 'A'
        }
      }
      mapaTemporario[linhaZero][colunhaZero] = objeto;
      mapaTemporario[linhaUma][colunhaUma].valor = alfabeto[alfabeto.findIndex(item => item === mapaTemporario[linhaUma][colunhaUma].valor) + 1]
    }
    setMapa(mapaTemporario)
    setSelecionadas([-1, -1])
    setMensagemErro(mensagemDefault)
    setErro('sucesso')
    setRecarrega(true)
  }



  return (
    <div className="App">
      <div className='header'>
        <p>TatitataMerge</p>
      </div>
      <div className='body'>
        {mapa.map((linha, indexlinha) => {
          return (
            <div key={indexlinha} className='linhaCaixa'>
              {linha.map((item, indexcoluna) => {
                return (
                  <ImprimeNumeros
                    key={indexlinha * 4 + indexcoluna}
                    chave={indexlinha * 4 + indexcoluna}
                    objeto={item}
                    selecionadas={selecionadas}
                    setSelecionadas={setSelecionadas}
                  />
                )
              })}
            </div>
          )
        })}
        <p className={`mensagem-${erro}`}>{mensagemErro}</p>
        <div className='botoes'>
          <button onClick={onClickMerge} disabled={botoesDesligados} className='botaoMerge'>
            <img src={add} alt="Botão de merge" />
          </button>

        </div>
      </div>
    </div>
  );
}

export default App;
