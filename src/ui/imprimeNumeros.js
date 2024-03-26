import { useEffect, useState } from 'react';
import './imprimeNumero.css'
import { alfabeto } from '../App';

export function ImprimeNumeros({ chave, objeto, selecionadas, setSelecionadas }) {
  const cor = `cor-${objeto.valor}`;

  const [selected, setSelected] = useState(false)

  useEffect(() => {
    async function fetch() {
    }
    fetch()
  }, [selecionadas])

  function onClickNumero() {
    setSelected(!selected)
    handleSelecionadas()
  }

  function handleSelecionadas() {
    if (selecionadas[0] === -1) {
      setSelecionadas([chave, -1])
    } else if (selecionadas[1] === -1) {
      setSelecionadas([selecionadas[0], chave])
    } else {
      setSelecionadas([selecionadas[1], chave])
    }
  }

  return (
    <button className={selecionadas.includes(chave) ? `caixaNumero selecionada` : `caixaNumero ${cor}`} onClick={onClickNumero} >
      {objeto.valor !== 0 ? objeto.valor : ''}
    </button>
  )
}