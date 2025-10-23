import React from 'react'
import { Link } from 'react-router-dom'

function NoHabit({ title }) {
    return (
        <div className="text-center pt-5 mt-10">
            {/* <p className="text-base font-semibold text-indigo-600">404</p> */}
            {/* <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                Page not found
            </h1> */}
            <p className="mt-10 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                {title}
            </p>
            <div className="mt-3 flex items-center justify-center gap-x-6">
                <Link
                    to="/habit"
                    className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                >
                    Create new
                </Link>
            </div>
        </div>)
}

export default NoHabit