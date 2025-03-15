export default function FormHeader({title,description}:{title:string,description:string}) {
return(
    <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-neutral-200">
          {title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
);
}
