import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ReactNode } from "react";

interface PolicyPageProps {
  title: string;
  children: ReactNode;
}

const PolicyPage: React.FC<PolicyPageProps> = ({ title, children }) => {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-24 md:py-32">
        <article className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold font-playfair text-primary">
              {title}
            </h1>
          </header>
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed font-playfair">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default PolicyPage;
