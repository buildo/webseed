export type HelloView = {
  view: 'hello',
  formal?: boolean
}

export type AnotherView = {
  view: 'another',
  id: number
}

export type NotFoundView = {
  view: 'notFound'
}

export type View = HelloView | NotFoundView | AnotherView

type Search = { [k: string]: string }

export function deserializeView(pathname: string, search: Search): View {
  if (pathname === '/' || pathname === '') {
    return { view: 'hello', formal: search.formal === 'true' };
  }

  const anotherViewMatch = pathname.match(/^\/another\/(\d+)$/)
  if (anotherViewMatch) {
    return { view: 'another', id: parseInt(anotherViewMatch[1], 10) };
  }

  return { view: 'notFound' };
}

export function serializeView(view: View): { pathname: string, search?: Search } {
  switch (view.view) {
    case 'hello': return { pathname: '/', search: view.formal ? { formal: view.formal } : {} }
    case 'another': return { pathname: `/another/${view.id}` }
    default: return { pathname: '/' }
  }
}
