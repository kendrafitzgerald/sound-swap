import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const { data } = useQuery(QUERY_USER);
  let user;
  if (data) {
    user = data.user;
  }
  return (
    <>
      <div className="container my-1">
        <Link to="/">
          <FontAwesomeIcon icon={faArrowsLeftRight} />
          Back to Home
        </Link>
        {user ? (
          <>
            <h2>{user.firstName}'s WishList</h2>
            {/* <h3>{user.wishlist}</h3> wishlist component?*/}
            <h2>{user.firstName}'s Uploads</h2>
            {user.uploads.map((upload) => (
              <div key={upload._id} className="my-2">
                <h3>
                  <img src={upload.img} alt={upload.album} />
                  {upload.album} {upload.artist} {upload.genre}
                  {upload.description}
                </h3>
                <h4>{upload.price}</h4>
              </div>
            ))}
            <h2>{user.firstName}'s Order History</h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {order.uploads.map(({ _id, img, album, price }, index) => (
                    <div key={index}>
                      <Link to={`/results/${_id}`}>
                        <img alt={album} src={`/images/${img}`} />
                        <p>{album}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default Profile;