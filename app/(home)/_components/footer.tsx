import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid de Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Sobre o App */}
          <div>
            <h3 className="text-lg font-bold mb-4">GymOS</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Funcionalidades
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Planos
                </a>
              </li>
            </ul>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="text-lg font-bold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span>✉️</span>
                <span>contato@gymos.app</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📞</span>
                <span>(11) 98765-4321</span>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-lg font-bold mb-4">Siga-nos</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-500 transition"
              >
                <span className="sr-only">Instagram</span>
                📸
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-500 transition"
              >
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-500 transition"
              >
                <span className="sr-only">YouTube</span>
                ▶️
              </a>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Newsletter</h4>
              <div className="flex gap-2">
                <Input type="email" placeholder="Seu e-mail" />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Rodapé Inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>
              © {new Date().getFullYear()} GymOS. Todos os direitos reservados.
            </p>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-sm hover:text-blue-400">
              Termos de Serviço
            </a>
            <a href="#" className="text-sm hover:text-blue-400">
              Política de Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
