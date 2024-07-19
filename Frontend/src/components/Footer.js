import './Nav.css';
const navigation = {
    main: [
      { name: 'FrontEnd', href: 'https://github.com/Dr-Energy/FrontEnd_PowerForecast' },
      { name: 'BackEnd', href: 'https://github.com/Dr-Energy/Backend_PowerForecast' },
      { name: 'DataAnalysis', href: 'https://github.com/Dr-Energy/DA_PowerForecast' },
      { name: 'Air2Air', href: 'https://github.com/Dr-Energy' }
    ]
}
export default function Footer() {
    return (
      <footer className="bg-white
                      rounded-t-3xl -mt-10 w-full">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-10 sm:py-8 lg:px-8">
          <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
            {navigation.main.map((item) => (
              <div key={item.name} className="pb-6">
                <a href={item.href} className="text-sm leading-6 text-black hover:text-shadow">
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
          <p className="mt-5 text-center text-xs leading-5 text-black">
            &copy; 2024 Air2Air. All rights reserved.
          </p>
        </div>
      </footer>
    )
  }
  