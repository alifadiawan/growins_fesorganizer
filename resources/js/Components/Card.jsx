import { ReactNode } from "react";

export default function Card({ children, align = "center", justify = "between" }) {

    return (
        <section
            className={`card w-full lg:min-h-[30rem] bg-gradient-to-r from-teal-900 to-teal-600 bg-cover flex lg:flex-row flex-col gap-8 lg:gap-0 
        items-${align} justify-${justify} text-white lg:px-16 px-8 py-12 mb-8`}
        >
            {children}
        </section>
    );
}
