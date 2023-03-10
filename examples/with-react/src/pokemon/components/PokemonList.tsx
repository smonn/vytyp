import { Link } from 'react-router-dom';
import type { NamedAPIResourceList } from '../types/Pokemon';

export function PokemonList(props: { items: NamedAPIResourceList['results'] }) {
  return (
    <div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {props.items.map((item) => (
          <li key={item.name}>
            <Link to={`/pokemon/${item.name}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
