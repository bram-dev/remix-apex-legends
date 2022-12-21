
import { Form, useNavigate } from "@remix-run/react";
import { Avatar, DarkThemeToggle, Dropdown, Flowbite, Navbar } from "flowbite-react";

export default function NavigationBar(profile: any) {
  const navigate = useNavigate();
  
  return (
  <>
    <Navbar
    className="px-4"
      fluid={true}
    >
      <Navbar.Brand href="/home">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/11/Apex-Legends-Emblem.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Apex sweats
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={<Avatar alt="User settings" img={profile?.profile?._json?.picture} rounded={true}/>}
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {profile?.profile?._json?.name}
            </span>
            <span className="block truncate text-sm font-medium">
              {profile?.profile?._json?.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>
            <Form method="post" action="/logout">
              <button>Log Out</button>
            </Form>
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle className="ml-4" />
        <Flowbite>
          <DarkThemeToggle className="ml-4"/>
      </Flowbite>
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          className="cursor-pointer"
          onClick={() => navigate("/home")}
          active={true}
        >
          Home
        </Navbar.Link>
        <Navbar.Link className="cursor-pointer" onClick={() => navigate("/games")}>
          Games
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  </>
  );
}
