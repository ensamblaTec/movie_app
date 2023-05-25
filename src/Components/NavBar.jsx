function NavBar() {
  return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">Movie APP API</a>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered" />
    </div>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="https://ichef.bbci.co.uk/images/ic/480xn/p01ggrtf.jpg" />
        </div>
      </label>
    </div>
  </div>
</div>
  );
}

export default NavBar;
