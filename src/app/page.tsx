import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grow">
      <div className="container mx-auto">
        {/* SEÇÃO HERO */}
        <section>
          <h1>Receitas Refinadas</h1>
          <p>Descubra receitas saborosas para afinar seu paladar</p>
          <Link href={"/receitas"}>
          </Link>
        </section>
      </div>
    </main>
  );
}
