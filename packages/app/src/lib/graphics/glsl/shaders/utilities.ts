import { parser, generate } from '@shaderfrog/glsl-parser';
import { visit, type LiteralNode, type IdentifierNode, type FunctionCallNode, type Whitespace, type AstNode } from '@shaderfrog/glsl-parser/ast';
import { preprocess } from '@shaderfrog/glsl-parser/preprocessor';

import * as A from "@/lib/arrays"

import { UNARY_OPERATORS, BINARY_OPERATORS, UNARY_FUNCTIONS, BINARY_FUNCTIONS } from "@/lib/graphics/glsl/shaders"

const literal = <T>(literal: T, whitespace: Whitespace): LiteralNode<T> => ({
  type: 'literal',
  literal,
  whitespace,
});

const identifier = (identifier: string): IdentifierNode => ({
  type: 'identifier',
  identifier,
  whitespace: '',
});

const replaceUnary: (name: string, args: any) => FunctionCallNode = (name, args) => ({
  "type": "function_call",
  "identifier": {
      "type": "type_specifier",
      "specifier": {
          "type": "type_name",
          "identifier": name,
          "whitespace": ""
      },
      "quantifier": null
  },
  "lp": literal("(", ""),
  "args": args,
  "rp": literal(")", ""),
})

const replaceBinary: (name: string, args: any) => FunctionCallNode = (name, args) => ({
    "type": "function_call",
    "identifier": {
        "type": "type_specifier",
        "specifier": {
            "type": "type_name",
            "identifier": name,
            "whitespace": ""
        },
        "quantifier": null
    },
    "lp": literal("(", ""),
    "args": args,
    "rp": literal(")", ""),
})

const replaceFunctionCall: (name: string, args: any) => FunctionCallNode = (name, args) => ({
    "type": "function_call",
    "identifier":  identifier(name),
    "lp": literal("(", ""),
    "args": args,
    "rp": literal(")", ""),
})

export const process = (source: string, options?: parser.ParserOptions) => {
  //preprocess(source, {})
  const ast = parser.parse(source, options)
  const isIdentifier = (node: AstNode): node is IdentifierNode => node.type === "identifier"
  visit(ast, {
    unary: {
      enter(path) {
        const operator = path.node.operator.literal
        if (operator in UNARY_OPERATORS) {
          const replacementNode = replaceUnary(UNARY_OPERATORS[operator], [path.node.expression])
          path.replaceWith(replacementNode)
        }
      }
    },
    binary: {
      enter(path) {
        const operator = path.node.operator.literal
        if (operator in BINARY_OPERATORS) {
          const replacementNode = replaceBinary(BINARY_OPERATORS[operator], [path.node.left, literal(",", " "), path.node.right])
          path.replaceWith(replacementNode)
        }
      }
    },
    function_call: {
      enter(path) {
        if (isIdentifier(path.node.identifier)) {
          const identifer = path.node.identifier.identifier
          if ((identifer in UNARY_FUNCTIONS) || (identifer in BINARY_FUNCTIONS)) {
            const replacementNode = replaceFunctionCall(UNARY_FUNCTIONS[identifer], path.node.args)
            path.replaceWith(replacementNode)
          }
        }
      }
    }
  })
  return generate(ast)
}
