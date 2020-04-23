import React from "react";
import ProjectList from "../../components/Feed/ProjectList";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Box from "@material-ui/core/Box";
const dummyData2 = [
  {
    researcher: {
      first_name: "Indika",
      last_name: "Perera",
      display_image: "/images/tmp/food.jpg",
    },
    institution: "University of Moratuwa",
    published_on: "2020 02 20",
    image: "/images/tmp/food.jpg",
    title: "Introduction to Computer Architecture",
    link: "/project/viewproject/1",
    description:
      "When I say output, I mean not just output viewable to the end user as in the case of a dialog box, but also HTML output that will eventually be printed to a page with JavaScript. Note that HTML output is rendered by the browser, making any formatting of the HTML of no consequence to the end user. It is the scripter who benefits from cleanly formatted source code. When you create a plain HTML page and view it in your browser, if it doesn't look right, what do you do? You look at the source code. It is no different when you generate an entire page with JavaScript and something doesn't look right - you should check your HTML. But since all you will see is JavaScript in your text editor, you need a way to view the rendered source in a clean, readable format. You can use an alert dialog box to view it, or a cool little program written by Bill Friedrich that you can install on your computer. See the Troubleshooting lesson for more information and to download the program. Remember - the newline character will only create a break in source code, or in a dialog box as in the above examples. The newline character will not create a break in the rendered HTML. To create a line break in rendered HTML, you must use the HTML break tag (or similar tag) in the string just as if you were writing source code in an editor. Formatting Style Sheet Code",
  },

  {
    researcher: {
      first_name: "Indika",
      last_name: "Perera",
      display_image: "/images/tmp/food.jpg",
    },
    institution: "University of Moratuwa",
    published_on: "2020 02 20",
    image: "/images/tmp/food.jpg",
    title: "Introduction to Computer Architecture",
    link: "/project/viewproject/1",
    description:
      "When I say output, I mean not just output viewable to the end user as in the case of a dialog box, but also HTML output that will eventually be printed to a page with JavaScript. Note that HTML output is rendered by the browser, making any formatting of the HTML of no consequence to the end user. It is the scripter who benefits from cleanly formatted source code. When you create a plain HTML page and view it in your browser, if it doesn't look right, what do you do? You look at the source code. It is no different when you generate an entire page with JavaScript and something doesn't look right - you should check your HTML. But since all you will see is JavaScript in your text editor, you need a way to view the rendered source in a clean, readable format. You can use an alert dialog box to view it, or a cool little program written by Bill Friedrich that you can install on your computer. See the Troubleshooting lesson for more information and to download the program. Remember - the newline character will only create a break in source code, or in a dialog box as in the above examples. The newline character will not create a break in the rendered HTML. To create a line break in rendered HTML, you must use the HTML break tag (or similar tag) in the string just as if you were writing source code in an editor. Formatting Style Sheet Code",
  },

  {
    researcher: {
      first_name: "Indika",
      last_name: "Perera",
      display_image: "/imagess/tmp/food.jpg",
    },
    institution: "University of Moratuwa",
    published_on: "2020 02 20",
    image: "/images/tmp/food.jpg",
    title: "Introduction to Computer Architecture",
    link: "/project/viewproject/1",
    description:
      "When I say output, I mean not just output viewable to the end user as in the case of a dialog box, but also HTML output that will eventually be printed to a page with JavaScript. Note that HTML output is rendered by the browser, making any formatting of the HTML of no consequence to the end user. It is the scripter who benefits from cleanly formatted source code. When you create a plain HTML page and view it in your browser, if it doesn't look right, what do you do? You look at the source code. It is no different when you generate an entire page with JavaScript and something doesn't look right - you should check your HTML. But since all you will see is JavaScript in your text editor, you need a way to view the rendered source in a clean, readable format. You can use an alert dialog box to view it, or a cool little program written by Bill Friedrich that you can install on your computer. See the Troubleshooting lesson for more information and to download the program. Remember - the newline character will only create a break in source code, or in a dialog box as in the above examples. The newline character will not create a break in the rendered HTML. To create a line break in rendered HTML, you must use the HTML break tag (or similar tag) in the string just as if you were writing source code in an editor. Formatting Style Sheet Code",
  },
];
export default function Feed() {
  return (
    <Box display="flex" flexDirection="column">
      <Box>
        <Navbar />
      </Box>
      <Box flexGrow="1">
        <ProjectList projects={dummyData2} />
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
}
