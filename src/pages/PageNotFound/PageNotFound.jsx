import React from 'react'

const PageNotFound = () => {
    return (
        <div>
            <div id="title">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="780"
                height="299"
                viewBox="0 0 780 299"
                >
                <path
                    fill="url(#skyGradient)"
                    d="M.4 251v-64.8L123.2 11h86v172H240v68h-30.8v48H130v-48H.4zM136 99.4L80.8 183H136V99.4zm136.163 49.2c0-45.867 9.333-82 28-108.4 18.666-26.4 48-39.6 88-39.6s69.333 13.2 88 39.6c18.933 26.4 28.4 62.533 28.4 108.4 0 46.4-9.334 82.8-28 109.2-18.667 26.4-48.134 39.6-88.4 39.6-40.267 0-69.734-13.2-88.4-39.6-18.4-26.4-27.6-62.8-27.6-109.2zm154.8 0c0-24-2.534-42.267-7.6-54.8-5.067-12.8-15.467-19.2-31.2-19.2-15.734 0-26.134 6.4-31.2 19.2-5.067 12.533-7.6 30.8-7.6 54.8 0 24.533 2.4 43.2 7.199 56 5.067 12.533 15.601 18.8 31.601 18.8 16 0 26.4-6.267 31.2-18.8 5.066-12.8 7.6-31.467 7.6-56zM539.853 251v-64.8L662.653 11h86v172h30.8v68h-30.8v48h-79.2v-48h-129.6zm135.6-151.6l-55.2 83.6h55.2V99.4z"
                ></path>
                <defs>
                    <linearGradient id="skyGradient" x1="100%" y1="100%">
                    <stop offset="0%" stopColor="#add8e6" stopOpacity="0.5">
                        <animate
                        attributeName="stop-color"
                        dur="14s"
                        repeatCount="indefinite"
                        values="lightblue;blue;red;red;black;red;red;purple;lightblue"
                        ></animate>
                    </stop>
                    <stop offset="100%" stopColor="#add8e6" stopOpacity="0.5">
                        <animate
                        attributeName="stop-color"
                        dur="14s"
                        repeatCount="indefinite"
                        values="lightblue;orange;purple;purple;black;purple;purple;blue;lightblue"
                        ></animate>
                        <animate
                        attributeName="offset"
                        dur="14s"
                        repeatCount="indefinite"
                        values=".95;.80;.60;.40;.20;0;.20;.40;.60;.80;.95"
                        ></animate>
                    </stop>
                    </linearGradient>
                </defs>
                </svg>
            </div>
            <p>Página no encontrada</p>
        </div>
    )
}

export default PageNotFound
