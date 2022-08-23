export default function Navbar() {
  return (
    <nav
      flex="~"
      bg="[#16ABF8]"
      className="w-full mx-auto"
      pos="relative"
      align="items-center"
      h="[105px]"
      p="x-[100px] md:x-[160px] lg:x-[220px]"
    >
      <div flex="inline" data-cy="header-background">
        <a className="_o6689fn" href="/">
          <div className="md:block" data-cy="header-title">
            <span text="uppercase white size-[24px]" font="bold">
              TO DO LIST APP
            </span>
          </div>
        </a>
      </div>
    </nav>
  );
}
