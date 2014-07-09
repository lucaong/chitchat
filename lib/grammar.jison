/* Operators, associativity and precedence */

%left ','
%left '||'
%left '&&'
%left '==' '!='
%left '>' '<' '>=' '<='
%left '+' '-'
%left '*' '/'
%right '!'

%start Program

%%

Program
  :/* nothing */  { return new yy.AST.Expressions([]) }
  | Expressions   { return new yy.AST.Expressions( $1 ) }
  ;

Expressions
  : Expression                         { $$ = [ $1 ] }
  | Expressions Terminator Expression  { $1.push( $3 ); $$ = $1 } 
  | Expressions Terminator             { $$ = $1 } 
  | Terminator                         { $$ = [] }
  ;

Expression
  : Literal
  | MethodCall
  | Operator
  | GetVar
  | SetVar
  | GetProp
  | SetProp
  | MethodDef
  | ClassDef
  | NewObject
  | If
  | Return
  | '(' Expression ')'  { $$ = $2 }
  ;

Terminator
  : EOL
  | ';'
  ;

Literal
  : INTEGER  { $$ = new yy.AST.Integer( yytext ) }
  | FLOAT    { $$ = new yy.AST.Float( yytext ) }
  | STRING   { $$ = new yy.AST.String( yytext ) }
  | BOOLEAN  { $$ = new yy.AST.Boolean( yytext ) }
  | NOTHING  { $$ = yy.AST.Nothing }
  ;

MethodCall
  : TELL GetVar STRING            { $$ = new yy.AST.MethodCall( $2, $3, [] ) }
  | TELL GetVar STRING Arguments  { $$ = new yy.AST.MethodCall( $2, $3, $4 ) }
  ;

Arguments
  : '(' GIVEN ArgList ')'  { $$ = $3 }
  | GIVEN ArgList          { $$ = $2 }
  ;

ArgList
  : Arg                    { $$ = [ $1 ] }
  | ArgList SEPARATOR Arg  { $1.push( $3 ); $$ = $1 }
  ;

Arg
  : IDENTIFIER ':' Expression  { $$ = { name: $1, value: $3 } }
  ;

Operator
  : Expression '||' Expression  { $$ = new yy.AST.Operator( $1, $2, $3 ) }
  | Expression '&&' Expression  { $$ = new yy.AST.Operator( $1, $2, $3 ) }
  | Expression '==' Expression  { $$ = new yy.AST.Operator( $1, '==', $3 ) }
  | Expression '!=' Expression  { $$ = new yy.AST.Operator( $1, $2, $3 ) }
  | Expression '>'  Expression  { $$ = new yy.AST.Operator( $1, $2, $3 ) }
  | Expression '>=' Expression  { $$ = new yy.AST.Operator( $1, $2, $3 ) }
  | Expression '<'  Expression  { $$ = new yy.AST.Operator( $1, $2, $3 ) }
  | Expression '<=' Expression  { $$ = new yy.AST.Operator( $1, $2, $3 ) }
  | Expression '*'  Expression  { $$ = new yy.AST.Operator( $1, $2, $3 ) }
  | Expression '/'  Expression  { $$ = new yy.AST.Operator( $1, $2, $3 ) }
  | Expression '+'  Expression  { $$ = new yy.AST.Operator( $1, $2, $3 ) }
  | Expression '-'  Expression  { $$ = new yy.AST.Operator( $1, $2, $3 ) }
  ;

SetVar
  : IDENTIFIER IS Expression  { $$ = new yy.AST.SetVar( $1, $3 ) }
  ;

GetVar
  : IDENTIFIER  { $$ = new yy.AST.GetVar( yytext ) }
  ;

SetProp
  : Expression SQUOTE IDENTIFIER IS Expression
    { $$ = new yy.AST.SetProp( $1, $3, $5 ) }
  | ITS IDENTIFIER IS Expression
    { $$ = new yy.AST.SetProp( new yy.AST.Self, $2, $4 ) }
  ;

GetProp
  : Expression SQUOTE IDENTIFIER  { $$ = new yy.AST.GetProp( $1, $3 ) }
  | ITS IDENTIFIER  { $$ = new yy.AST.GetProp( new yy.AST.Self, $2 ) }
  ;

Block
  : BLOCKSTART Expressions BLOCKEND  { $$ = $2 }
  ;

MethodDef
  : WHEN IDENTIFIER TOLD STRING MethodBody
    { $$ = new yy.AST.MethodDef( $2, $4, [], $5 ) }
  | WHEN IDENTIFIER TOLD STRING DefArguments MethodBody
    { $$ = new yy.AST.MethodDef( $2, $4, $5, $6 ) }
  ;

DefArguments
  : '(' GIVEN DefArgList ')'  { $$ = $3 }
  | GIVEN DefArgList          { $$ = $2 }
  ;

DefArgList
  : IDENTIFIER                       { $$ = [ $1 ] }
  | DefArgList SEPARATOR IDENTIFIER  { $1.push( $3 ); $$ = $1 }
  ;

MethodBody
  : Return  { $$ = new yy.AST.Expressions([ $1 ]) }
  | Block   { $$ = new yy.AST.Expressions( $1 ) }
  ;

ClassDef
  : A IDENTIFIER IS KINDOF GetVar  { $$ = new yy.AST.ClassDef( $2, $5 ) }
  ;

NewObject
  : A GetVar  { $$ = new yy.AST.NewObject( $2 ) }
  ;

If
  : IF Expression THEN Block ELSE Block
    { $$ = new yy.AST.If( $2, new yy.AST.Expressions( $4 ), new yy.AST.Expressions( $6 ) ) }
  | IF Expression THEN Block
    { $$ = new yy.AST.If( $2, new yy.AST.Expressions( $4 ) ) }
  | IF Expression THEN Expression ELSE Expression  { $$ = new yy.AST.If( $2, $4, $6 ) }
  | IF Expression THEN Expression                  { $$ = new yy.AST.If( $2, $4 ) }
  ;

Return
  : REPLIES Expression  { $$ = new yy.AST.Return( $2 ) }
  ;
