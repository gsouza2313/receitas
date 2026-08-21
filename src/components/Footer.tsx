export default function Footer() {
  return (
    <footer className="w-full bg-white text-black py-4 border-t border-slate-200">
      <div className="container mx-auto text-center text-sm">
        © {new Date().getFullYear()} Receitas deliciosas
      </div>
    </footer>
  )
}
