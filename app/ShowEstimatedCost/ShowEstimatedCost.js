import './showEstimatedCost.css';


export function ShowEstimatedCost({
    estimatedCost,
    setEstimatedCost
}) {
    return(
        <section className="estimated-cost-section">
        <article>
          <div>
            <h2>Costo Estimado</h2>
            <p id="estimated_cost">El costo estimado de la compra es <span className='red-font'>{estimatedCost}</span> USD.</p>
          </div>
        </article>
      </section>
    );
}