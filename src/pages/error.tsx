import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError() as Error;

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <h1 className="text-4xl font-bold">Whooops, algo aconteceu! =/</h1>
      <p className="text-accent-foreground">
        Ocorreu um erro ao carregar a página, abaixo você encontra mais
        detalhes:
      </p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p className="text-accent-foreground">
        Voltar para o{" "}
        <Link to="/" className="text-sky-600 dark:text-sky-400">
          {" "}
          Dashboard
        </Link>{" "}
      </p>
    </div>
  );
};

export default Error;
