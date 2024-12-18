import { useState, useEffect } from "react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "./components/ui/card/Card";

interface Character {
  id: number;
  name: string;
  species?: {
    name: string;
  };
  homeworld?: {
    name: string;
  };
  chickenVersion?: {
    name: string;
  };
}


const APIGuide = () => {
	const [characters, setCharacters] = useState<Character[]>([]);

	useEffect(() => {
		fetch("http://localhost:8060/api/characters/original?take=10")
			.then((res) => res.json())
			.then((data) => setCharacters(data));
	}, []);

	return (
		<div className="p-8 max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold mb-6">Guide de l'API Star Wars</h1>

			{/* Endpoints Section */}
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Endpoints Disponibles</CardTitle>
					<CardDescription>
						Les différents points d'entrée de l'API
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div>
							<h3 className="font-semibold">Base url:</h3>
							<code className="bg-slate-100 p-2 rounded block">
                https://starwarsapi.remote-8.wilders.dev/api
							</code>
						</div>
						<div>
							<h3 className="font-semibold">Personnages Originaux:</h3>
							<code className="bg-slate-100 p-2 rounded block">
								/characters/original?take=10&skip=0
							</code>
						</div>
						<div>
							<h3 className="font-semibold">Versions Poulet:</h3>
							<code className="bg-slate-100 p-2 rounded block">
								/characters/chicken?take=10&skip=0
							</code>
						</div>
            <div>
							<h3 className="font-semibold">Homeworld:</h3>
							<code className="bg-slate-100 p-2 rounded block">
                /homeworld?take=10
							</code>
						</div>
            <div>
							<h3 className="font-semibold">Species:</h3>
							<code className="bg-slate-100 p-2 rounded block">
                /species?take=10
							</code>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Example Response */}
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Exemple de Réponse</CardTitle>
					<CardDescription>Structure des données retournées</CardDescription>
				</CardHeader>
				<CardContent>
					<pre className="bg-slate-100 p-4 rounded overflow-x-auto">
						{JSON.stringify(
							{
								id: 1,
								name: "Luke Skywalker",
								height: "172",
								mass: "073",
								birth_year: "-19",
								gender: "male",
                canon_status: true,
                imageUrl: "https://vignette.wikia.nocookie.net/starwars/images/2/20/LukeTLJ.jpg",
								species: {
									name: "Human",
									classification: "mammal",
                  average_lifespan: "120"
								},
								homeworld: {
									name: "Tatooine",
									climat: "arid",
								},
							},
							null,
							2,
						)}
					</pre>
				</CardContent>
			</Card>

			{/* Example Usage */}
			<Card>
				<CardHeader>
					<CardTitle>Exemple d'Utilisation en React</CardTitle>
					<CardDescription>Comment consommer l'API</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="bg-slate-100 p-4 rounded">
							<code className="block whitespace-pre">
								{`
const [characters, setCharacters] = useState([]);

useEffect(() => {
  fetch(\`https://starwarsapi.remote-8.wilders.dev/api/characters/original?take=10\`)
    .then(res => res.json())
    .then(data => setCharacters(data));
}, []);
                `}
							</code>
						</div>

						{/* Live Example */}
						<div className="mt-4">
							<h3 className="font-semibold mb-2">Exemple en Direct:</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{characters.map((char) => (
									<Card key={char.id}>
										<CardContent className="p-4">
											<h4 className="font-bold">{char.name}</h4>
											<p>Espèce: {char.species?.name}</p>
											<p>Planète: {char.homeworld?.name}</p>
											{char.chickenVersion && (
												<p className="mt-2 text-sm text-gray-600">
													Version Poulet: {char.chickenVersion.name}
												</p>
											)}
										</CardContent>
									</Card>
								))}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default APIGuide;
