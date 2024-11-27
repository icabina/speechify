import React, { useState, useEffect, useRef } from 'react';
import {speechify} from './play';
import {getTopLevelReadableElementsOnPage} from './parser.ts';

const PlayButton = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    id="play-icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      cursor: "pointer",
      background: "#6B78FC",
      borderRadius: "50%",
    }}
    {...props}
  >
    <path
      d="M16.3711 11.3506C16.8711 11.6393 16.8711 12.361 16.3711 12.6497L10.3711 16.1138C9.87109 16.4024 9.24609 16.0416 9.24609 15.4642L9.24609 8.53603C9.24609 7.95868 9.87109 7.59784 10.3711 7.88651L16.3711 11.3506Z"
      fill="white"
    />
  </svg>
);

export default function HoverPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null); // Create a ref for the paragraph

  // const rootRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<Node | null>(null)

  // const t = getTopLevelReadableElementsOnPage(rootRef);

  const handlePlay = () => {
    setIsPlaying(true);
    if (paragraphRef.current) {
      speechify(paragraphRef.current); // Pass the DOM element to speechify
    }
    console.log('Playing text...');
  };

  return (
    <div>
      <PlayButton onClick={handlePlay} />
      {isPlaying && (
        <>
        <p ref={paragraphRef}>Playing text... (Add text-to-speech functionality here)</p>

        <div id="root"></div>
        <div id="content-1">
            <article>
                <header>
                    <h1 id="title">An Interesting HTML Document</h1>
                    <span>
                        <address id="test">John Doe</address>
                    </span>
                </header>
                <section>
                    <div>
                        <p id="paragraph-lorem-ipsum">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum
                        </p>
                        <blockquote>
                            This is a blockquote element on the page.
                        </blockquote>
                        <h2>A very interesting subtopic</h2>
                        <p>
                            The standard chunk of Lorem Ipsum used since the
                            1500s is reproduced below for those interested.
                            Sections 1.10.32 and 1.10.33 from "de Finibus
                            Bonorum et Malorum" by Cicero are also reproduced in
                            their exact original form, accompanied by English
                            versions from the 1914 translation by H. Rackham.
                            <a href="https://www.lipsum.com/"
                                >Link to lipsum.com</a
                            >
                            Various versions have evolved over the years,
                            sometimes by accident, sometimes on purpose
                            (injected humour and the like).
                        </p>
                        <figure>
                            <img src="https://via.placeholder.com/500" />
                        </figure>
                        <h2 id="model-dependency">Functors in a sample page</h2>
                        <p>
                            In mathematics, specifically category theory, a
                            functor is a mapping between categories. Functors
                            were first considered in algebraic topology, where
                            algebraic objects are associated to topological
                            spaces, and maps between these algebraic objects are
                            associated to continuous maps between spaces.
                        </p>
                        <blockquote>
                            A <strong>functor</strong> is a
                            <a
                                href="https://en.wikipedia.org/wiki/Design_pattern"
                                >design pattern</a
                            >
                            inspired by
                            <a href="https://en.wikipedia.org/wiki/Functor"
                                >the definition from category theory</a
                            >, that allows for a
                            <a href="https://en.wikipedia.org/wiki/Generic_type"
                                >generic type</a
                            >
                            to apply a
                            <a
                                href="https://en.wikipedia.org/wiki/Function_(mathematics)"
                                >function</a
                            >
                            inside without changing the structure of the generic
                            type.
                        </blockquote>
                        <p>
                            Javascript uses functors in the form of
                            Symbol.iterator. Most built-in objects have a
                            <code>[Symbol.iterator]</code> key which describes
                            how to iterate over the given object. You can learn
                            more about it on the incredible
                            <a href="https://javascript.info/iterable"
                                >javascript.info</a
                            >. This concept allows us to do iteration and by
                            extension, mapping (<code>.map()</code>,
                            <code>.filter()</code>, etc) on many different
                            objects from arrays to generators. The function we
                            provide to <code>map()</code> will be run on all the
                            iterable's values while maintaining the container's
                            generic type.
                        </p>
                    </div>
                </section>
            </article>
        </div>
        </>

      )}
    </div>
  );
}
