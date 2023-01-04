import React from 'react'
import { Link } from 'react-router-dom'

const Saved = () => {
  return (
    <div>
      <section class="flex items-center h-screen p-16 dark:text-gray-100">
	<div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div class="max-w-md text-center">
			<h2 class="mb-8 font-extrabold text-9xl dark:text-gray-600">
				<span class="sr-only">Error</span>404
			</h2>
			<p class="text-2xl font-semibold md:text-3xl">Sorry, I am currently working on this feature.</p>
			<p class="mt-4 mb-8 dark:text-gray-400">But dont worry, you can find plenty of other things on our homepage.</p>
			<Link to='/' rel="noopener noreferrer" href="#" class="px-8 py-3 font-semibold rounded dark:bg-teal-400 dark:text-gray-900">Back to homepage</Link>
		</div>
	</div>
</section>
    </div>
  )
}

export default Saved