"use client";




export default function Header() {
  return (<>
        <header className="w-full shadow mt-10">
            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center">
                        <span className="font-bold">
                            لوگو
                        </span>
                    </div>
                    <span className="text-xl font-bold">
                        شناتک
                    </span>
                </div>
            </div>

        </header>
  </>);
}
