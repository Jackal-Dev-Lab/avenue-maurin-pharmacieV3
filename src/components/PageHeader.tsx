interface PageHeaderProps {
  title: string;
  description: string;
  image?: string;
}

export const PageHeader = ({ title, description, image }: PageHeaderProps) => {
  return (
    <section className="relative bg-gradient-hero py-16 md:py-24 overflow-hidden">
      {image && (
        <div className="absolute inset-0 opacity-10">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};
