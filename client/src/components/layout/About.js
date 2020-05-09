import React from 'react';
import HeroPic from '../../img/about-hero.jpg';

const About = () => {
  return (
    <div>
      <section className="container" id="about">
        <h1 className="large text-primary py-1">About us</h1>
        <div className="about">
          <div className="figure">
            <img className="about-hero" src={HeroPic} />
          </div>
          <div className="about-text">
            <p>
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
              Praesent quis maximus lacus, in mollis tortor. Donec ultricies
              arcu enim, sed blandit eros porta et. Nunc scelerisque eros sit
              amet pulvinar feugiat. Mauris sed velit augue. Aliquam sagittis
              tellus eros, ullamcorper dictum metus dapibus eu. Sed auctor orci
              a tincidunt iaculis. Nullam a lorem sit amet augue lacinia
              consectetur. Nulla maximus urna elit, a venenatis purus ultrices
              vel. Donec id sollicitudin nulla. In tempor felis non lectus
              consectetur convallis. Mauris interdum, nulla id tincidunt
              viverra, sem odio ultrices justo, id feugiat justo magna sed
              justo. Phasellus et nisi nec orci placerat pellentesque semper
              euismod diam. Proin vel enim sit amet nisl ultrices sollicitudin
              vel vitae dui. Curabitur tincidunt scelerisque sem, a vestibulum
              dolor condimentum vitae. Nullam elit augue, scelerisque non purus
              a, pulvinar ullamcorper diam. Nam auctor, ipsum non pulvinar
              pellentesque, massa neque tincidunt ligula, rutrum gravida mauris
              leo mattis enim. Pellentesque consectetur neque et iaculis
              viverra. Nullam non porta turpis. Aenean pellentesque ante sed
              placerat tincidunt. Morbi ut magna cursus, eleifend erat quis,
              eleifend libero.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
